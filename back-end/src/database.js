import { createConnection } from "mysql2/promise";
import { config } from "./config.js";

export const DBConn = await createConnection(config.database)
DBConn.connect()

/**
 * Verifica a existência de uma conta no banco de dados comparando um objeto onde as chaves são as colunas com os valores para serem comparados
 * @param {{[string]?: any}} fields 
 */
export async function checkAccountExistance(fields) {
    const result = await DBConn.execute(`SELECT COUNT(*) FROM accounts WHERE ${Object.keys(fields).map(key => `${key}=?`).join(" AND ")} LIMIT 1`, Object.values(fields));
    return result[0][0]['COUNT(*)'] > 0;
}

/**
 * Valida a existência de uma coleção pelo ID da mesma
 * @param {number} id - id da coleção
 * @returns {boolean} verdadeiro se a coleção existir
 */
export async function checkCollectionExistance(id) {
    const result = await DBConn.execute(`SELECT COUNT(*) FROM collections WHERE id = ?;`, [id]);
    return result[0][0]['COUNT(*)'] > 0;
}


/**
 * Cria uma conta no banco de dados salvando os valores de um objeto onde chaves são as colunas
 * @param {{[string]?: any}} fields 
 */
export async function createAccount(fields) {
    if (await checkAccountExistance(fields))
        return false;

    const [res] = await DBConn.execute(`INSERT INTO accounts(${Object.keys(fields).join(", ")}) VALUES(${Object.values(fields).map(() => '?').join(", ")})`, Object.values(fields));
    await DBConn.execute(`INSERT INTO address(account_id, cep, house_number, street, neighborhood, city) VALUES(?, '', '', '', '', '')`, [res.insertId]);
    await DBConn.execute(`INSERT INTO account_styles(account_id, style_id) VALUES(?, 1)`, [res.insertId]);
    return true;
}

/**
 * Busca uma conta no banco de dados e retorna suas informações
 * @param {{[string]?: any}} fields 
 */
export async function getAccountInfo(fields) {
    if (!await checkAccountExistance(fields))
        return null;

    const [[info]] = await DBConn.execute(`SELECT * FROM accounts WHERE ${Object.keys(fields).map(key => `${key}=?`).join(" AND ")} LIMIT 1`, Object.values(fields));

    if (info) {
        info.softwares = [];

        const [softwares] = await DBConn.execute(`SELECT software_id FROM account_softwares WHERE account_id = ?`, [info.id]);
        
        for (const softwareId of softwares.map(s => s.software_id)) {
            const [[software]] = await DBConn.execute(`SELECT id, name, iconPath FROM collection_details_softwares WHERE id = ?`, [softwareId]);
            info.softwares.push(software);
        }

        const [[style]] = await DBConn.execute(`SELECT style_id FROM account_styles WHERE account_id = ?`, [info.id]);
        info.styles = style.style_id;

        const [formations] = await DBConn.execute(`SELECT formation_id, education, formation, institution, situation, startYear, endYear, period, semester FROM account_formation WHERE account_id = ?`, [info.id]);
        info.formations = formations;

        const [courses] = await DBConn.execute(`SELECT course_id, course, institution, workLoad, conclusionYear FROM account_courses WHERE account_id = ?`, [info.id]);
        info.courses = courses;

        const [experiences] = await DBConn.execute(`SELECT experience_id, role, company, companyPhone, remuneration, admissionDate, departureDate FROM account_experiences WHERE account_id = ?`, [info.id]);
        info.experiences = experiences;

        const [[office]] = await DBConn.execute(`SELECT id, name, cnpj, photo, owner_id FROM offices WHERE owner_id = ?`, [info.id]);
        info.office = office;

        const [[officeMember]] = await DBConn.execute('SELECT COUNT(*) FROM offices_members WHERE account_id = ?;', [info.id]);
        info.isOfficeMember = officeMember['COUNT(*)'] > 0;
    }
    
    return info;
}