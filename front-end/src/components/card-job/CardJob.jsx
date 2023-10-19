import CardCollection from '../card-collection/CardCollection'
import PropTypes from 'prop-types';
import { config } from '../../config';

export default function CardJob({ collection, isOpen, session }) {
    return (
        <CardCollection session={session} isOpen={isOpen} info={collection} imgProps={{src: `${config.api}/${collection.files[0]}`}}></CardCollection>
    )
}

CardJob.propTypes = {
    collection: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    session: PropTypes.object.isRequired
}