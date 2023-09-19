import CardCollection from '../card_job/CardCollection'
import PropTypes from 'prop-types';
import { config } from '../../config';

export default function CardHome({ collection, isOpen, session }) {
    return (
        <div className='col col-sm-3 card-home'>
            <CardCollection session={session} isOpen={isOpen} info={collection} imgProps={{src: `${config.api}/${collection.files[0]}`}}></CardCollection>
        </div>
    )
}

CardHome.propTypes = {
    collection: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    session: PropTypes.object.isRequired
}