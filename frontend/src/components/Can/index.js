import { connect } from 'react-redux';

function checkAuth({ roles, permissions }, checkRole, checkPermission) {
  if (checkRole && !roles.includes(checkRole)) {
    return false;
  }

  if (checkPermission && !permissions.includes(checkPermission)) {
    return false;
  }

  return true;
}

const mapStateToProps = state => ({
  auth: state.auth,
});

const Can = ({ children, auth, checkRole, checkPermission }) =>
  typeof children === 'function'
    ? children(checkAuth(auth, checkRole, checkPermission))
    : checkAuth(auth, checkRole, checkPermission) && children;

export default connect(mapStateToProps)(Can);
