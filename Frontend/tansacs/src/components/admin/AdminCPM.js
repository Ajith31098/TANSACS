import Detail from './detail'
import { CLUSTER_MANAGER } from '../initialValues/JobPost'


function AdminCPM() {
    return (
        <>
            <Detail data_position="CPM" position={CLUSTER_MANAGER} />
        </>
    );
}

export default AdminCPM;