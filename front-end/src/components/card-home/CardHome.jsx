import './card-home.css'
import CardCollection from '../card-collection/CardCollection'
import PropTypes from 'prop-types';
import { config } from '../../config';

export default function CardJob({ collection, isOpen, session }) {
    return (
        <div className='col col-sm-3 card-home'>
            <CardCollection session={session} isOpen={isOpen} info={collection} imgProps={{src: `${config.api}/${collection.files[0]}`}}></CardCollection>
        </div>
    )
}

CardJob.propTypes = {
    collection: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    session: PropTypes.object.isRequired
}