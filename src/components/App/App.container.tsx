import { connect } from 'react-redux';
import { IRootState } from '../../store/models/root.model';
import { appSetInitAction } from '../../store/reducers/app.reducer';
import App from '.';

const mapStateToProps = (state: IRootState) => ({
    init: state.app.init,
    loaded: state.app.loaded,
});

const mapDispatchToProps = {
    appSetInitAction,
}

const ConnectedApp = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default ConnectedApp;
