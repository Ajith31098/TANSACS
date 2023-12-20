import Detail from './detail'
import { CLINICAL_OFFICER } from '../initialValues/JobPost'


function AdminCSO() {
    return (
        <>
            <Detail data_position="CSO" position={CLINICAL_OFFICER} />
        </>
    );
}

export default AdminCSO;