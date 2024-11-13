import logo from './logo.svg';
import 'styles/App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import GetElement from 'components/Routing/GetElement';
import Main_Hub from 'components/main_hubv2';
import Filterer from 'components/utils/filterer';
import DiaryV2 from 'components/TheDiary';
import PopupFeedback from 'components/utils/PopupFeedback';
import ConfirmPopup from 'components/utils/CloseConfirmation';
import CharConfirmation from 'components/utils/CharConfimation';
import Gardening from 'components/TheLandPlot';
import CharSelect from 'stages/character_select';
function App() {

  const loc = useLocation();

  let currentClassName = {
    '/': 'home_bg',
    '/charselect': 'charselect',
    '/charconfirm': 'charconfirm',
    '/act_diary': 'act_diary',
    '/act_garden': 'act_garden',
    '/main': 'main'

  }[loc.pathname] || '';

  return (
    <div className={`appcontainer ${currentClassName}`}>
        <GetElement/>
    </div>
    
  )
}

export default App;
