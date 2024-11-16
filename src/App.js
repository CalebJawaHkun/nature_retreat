
import 'styles/App.css';
import { BrowserRouter, useLocation } from 'react-router-dom';
import GetElement from 'components/Routing/GetElement';
import FeedbackProvider from 'components/utils/FeedbackProvider';

import { useEffect } from 'react';
import { useSound } from 'components/utils/SoundProvider';
import PopupFeedback from 'components/utils/PopupFeedback';
import BreathingExercise from 'components/TheBreathingExercise';

function MetaData(cssClass, songIndex) {
  this.cssClass = cssClass;
  this.songIndex = songIndex;
}

function App() {

  const loc = useLocation();
  let currentPath = loc.pathname;

  let { selectBgSong, stopBgSong } = useSound();

 let {cssClass, songIndex} = {
  '/': new MetaData('home_bg', 0),
  '/charselect': new MetaData('charselect', 1),
  '/charconfirm': new MetaData('charconfirm', 2),
  '/act_diary': new MetaData('act_diary', 2),
  '/act_garden': new MetaData('act_garden', 3),
  '/main': new MetaData('main', 3),
  '/act_breath': new MetaData('act_breath')
 }[currentPath] || new MetaData(undefined, 0);

 let isExclussive = [
  '/act_med',
  '/act_breath'
 ].includes(currentPath);

 useEffect(() => { 
  //console.log('Song Index: ', songIndex);
  console.log('Current Path: ', currentPath);
  console.log('Is Exlusive: ', isExclussive);
  if(isExclussive) stopBgSong();
  if(!isExclussive && songIndex) selectBgSong(songIndex);
 }, [currentPath, songIndex]);

 useEffect(() => {

  const handleUnload = () => {
    localStorage.removeItem('charselected');
    localStorage.removeItem('selectedchar');
  };

  window.addEventListener('unload', handleUnload);

  return () => {
    window.removeEventListener('unload', handleUnload);
  }
 }, []);
 

  return (
    <div className={`appcontainer ${cssClass}`}>
      <FeedbackProvider>
        <GetElement/>
      </FeedbackProvider>
    </div>
    
  )
}

export default App;
