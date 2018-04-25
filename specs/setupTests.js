import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import initFaLibrary from '../src/initFaLibrary';

configure({ adapter: new Adapter() });
initFaLibrary();
