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


// {"_id":{"$oid":"5fce710299097fc83edf5788"},"firstName":"Vugar","lastName":"Yusifli","login":"L-strickland","workPhone":"409-345-0744","personalPhone":"488-888-9887","workEmail":"fax@mail.ru","personalEmail":"my@hotmail.com","hourlyRate":{"$numberDouble":"10.0"},"businessLocation":{"_id":{"$oid":"5fcee148995f8bae8207c3b9"},"title":"Seaside Horse"},"role":{"_id":{"$oid":"5fcee14f995f8bae8207c3ba"},"title":"Foreman"},"company":{"_id":{"$oid":"5fcee155995f8bae8207c3bb"},"title":"Google"}}