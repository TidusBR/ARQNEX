import express from 'express';
import { DBConn } from '../database.js';
import { Temporal } from '@js-temporal/polyfill';

/**
 * Id das ações de notificação
 * 0 = Curtida
 * 1 = Convite para escritório
 * 2 = Convite para escritório (rejeitado)
 * 3 = Convite para escritório (aceitado)
 * 4 = Convite aceito (contexto: Quando um convidado aceita o convite para o escritório, você recebe um aviso que o convite foi aceito)
 */

export const NotificationsRouter = express.Router();

NotificationsRouter.get("/", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401);
    }

    const [notifications] = await DBConn.execute('SELECT id, sender_id, action_id, extra_id, timestamp FROM notifications WHERE account_id = ?;', [req.session.user?.id]);

    for (const notification of notifications) {
        const [[sender]] = await DBConn.execute('SELECT name FROM accounts WHERE id = ?;', [notification.sender_id]);

        notification.sender_name = sender.name;

        if (notification.action_id === 0) {
            const [[collection]] = await DBConn.execute('SELECT title FROM collections WHERE id = ? LIMIT 1;', [notification.extra_id]);

            notification.collection_title = collection.title;

            const [[collectionFile]] = await DBConn.execute('SELECT file_path FROM collections_files WHERE collection_id = ? ORDER BY RAND() LIMIT 1;', [notification.extra_id]);
            notification.collection_image_url = collectionFile.file_path;
        } else if (notification.action_id >= 1 && notification.action_id <= 3) {
            const [[office]] = await DBConn.execute('SELECT name, photo FROM offices WHERE id = ?;', [notification.extra_id]);
            notification.office_name = office.name;
            notification.office_photo = office.photo;
        }
    }

    res.json(notifications);
});

/**
 * Cria uma notificação de curtida para o autor da coleção
 * @param {object} data
 * @param {number} data.collectionId id da coleção que foi curtida
 * @param {number} data.senderId id de quem curtiu a coleção 
 */
export async function createLikeNotification(data) {
    const [[collection]] = await DBConn.execute('SELECT author_id FROM collections WHERE id = ?;', [data.collectionId]);

    if (collection.author_id === data.senderId)
        return; // Não há necessidade de criar uma notificação se o próprio autor curtiu a coleção
    
    await DBConn.execute(
        'INSERT INTO notifications(account_id, sender_id, action_id, extra_id, timestamp) VALUES(?, ?, ?, ?, ?)',
        [collection.author_id, data.senderId, 0, data.collectionId, Temporal.Now.instant().epochMilliseconds]
    );
}

/**
 * Cria uma notificação de convite para escritório
 * @param {object} data
 * @param {number} data.personId id da pessoa convidada
 * @param {number} data.senderId id de quem enviou o convite
 * @param {number} data.officeId id do escritório
 */
export async function createOfficeInviteNotification(data) {
    const [[officeInvite]] = await DBConn.execute('SELECT COUNT(*) FROM notifications WHERE account_id = ? AND sender_id = ? AND action_id = 1;', [data.personId, data.senderId]);
    
    // Apenas envia o convite se não houver outro convite enviado pela mesma pessoa
    if (officeInvite['COUNT(*)'] === 0)
        await DBConn.execute(
            'INSERT INTO notifications(account_id, sender_id, action_id, extra_id, timestamp) VALUES(?, ?, ?, ?, ?)',
            [data.personId, data.senderId, 1, data.officeId, Temporal.Now.instant().epochMilliseconds]
        );
}

/**
 * Rejeita um convite de escritório
 * @param {object} data
 * @param {number} data.personId id de quem recebeu a notificação
 * @param {number} data.notificationId id da notificação
 */
export async function rejectOfficeInviteNotification(data) {
    const [[notification]] = await DBConn.execute('SELECT action_id FROM notifications WHERE account_id = ? AND id = ?;', [data.personId, data.notificationId]);

    if (notification === undefined || notification.action_id !== 1)
        return;
    
    await DBConn.execute(
        'UPDATE notifications SET action_id = 2 WHERE account_id = ? AND id = ?',
        [data.personId, data.notificationId]
    );
}

/**
 * Cria uma notificação para alertar que o convite do escritório foi aceito
 * @param {object} data
 * @param {number} data.personId id da pessoa convidada
 * @param {number} data.senderId id de quem enviou o convite
 */
export async function createOfficeInvitationAcceptedNotification(data) {
    const [[officeInvite]] = await DBConn.execute('SELECT COUNT(*) FROM notifications WHERE account_id = ? AND sender_id = ? AND action_id = 1;', [data.personId, data.senderId]);
    
    // Apenas envia o convite se não houver outro convite enviado pela mesma pessoa
    if (officeInvite['COUNT(*)'] === 0)
        await DBConn.execute(
            'INSERT INTO notifications(account_id, sender_id, action_id, extra_id, timestamp) VALUES(?, ?, ?, ?, ?)',
            [data.personId, data.senderId, 4, 0, Temporal.Now.instant().epochMilliseconds]
        );
}

/**
 * Rejeita um convite de escritório
 * @param {object} data
 * @param {number} data.personId id de quem recebeu a notificação
 * @param {number} data.notificationId id da notificação
 */
export async function acceptOfficeInviteNotification(data) {
    const [[notification]] = await DBConn.execute('SELECT sender_id, action_id, extra_id FROM notifications WHERE account_id = ? AND id = ?;', [data.personId, data.notificationId]);

    if (notification === undefined || notification.action_id !== 1)
        return;
    
    await DBConn.execute(
        'UPDATE notifications SET action_id = 3 WHERE account_id = ? AND id = ?',
        [data.personId, data.notificationId]
    );

    await createOfficeInvitationAcceptedNotification({
        personId: notification.sender_id,
        senderId: data.personId
    });

    return notification.extra_id;
}