import './card-home.css'
import CardCollection from '../card_job/CardCollection'
import PropTypes from 'prop-types';
import { config } from '../../config';

export default function CardHome({ collection }) {
    return (
        <div className='col-3 p-1 card-home'>
            <CardCollection info={collection} imgProps={{src: `${config.api}/${collection.files[0]}`}}></CardCollection>
        </div>
    )
}

CardHome.propTypes = {
    collection: PropTypes.object.isRequired
}