import StorageService from 'utils/StorageService';
import { EMITTER_EVENTS } from '../../../utils/constants';
import Emitter from '../../../utils/events';

function Logout() {
  StorageService.clear();
  Emitter.emit(EMITTER_EVENTS.LOG_OUT);
}

export default Logout;
