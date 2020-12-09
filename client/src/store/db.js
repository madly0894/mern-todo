import {ObjectId} from "../utils/helpers";

const db = {
    businessLocations: [
        {_id: ObjectId(), title: 'Seaside Horse'},
        {_id: ObjectId(), title: 'Intermezzo'},
        {_id: ObjectId(), title: 'Blueprint'}
    ],
    roles: [
        {_id: ObjectId(), title: 'Foreman'},
        {_id: ObjectId(), title: 'Helper'},
        {_id: ObjectId(), title: 'Driver'}
    ],
    companies: [
        {_id: ObjectId(), title: 'Google'},
        {_id: ObjectId(), title: 'Facebook'},
        {_id: ObjectId(), title: 'Twitter'}
    ]
};

export default db;