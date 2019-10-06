import { connect } from 'react-redux';
import { IRootState } from '../../store/models/root.model';
import { appSetInitAction } from '../../store/reducers/app.reducer';
import App from '.';

const mapStateToProps = (state: IRootState) => ({
    init: state.app.init,
});

const mapDispatchToProps = {
    appSetInitAction,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default ConnectedApp;
