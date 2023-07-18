import RolesSelectPermissions from '../../../components/Administration/Role/RolesSelectPermissions'
import classes from './RolesPermissions.module.scss'
const RolesPermissions = () =>{
    return(
    <div className={classes.RolesPermissions}>
        <h1>Role > Give Permissions </h1>
    <RolesSelectPermissions/>
    </div>)
}

export default RolesPermissions;