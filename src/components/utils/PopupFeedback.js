
import * as FB from 'assets/bg/fb/fb_barrel';
import Cross from './cross';
import 'components/comstyles/popupfeedback.css';
let Messages = {
    "Bubble Pop": [
        "Nice and easy! Enjoy the calm as each bubble drifts away.",
        "You’re doing great! Each pop is a little moment of peace.",
        "Take your time... let the bubbles float as long as you'd like.",
        "Smooth and serene. You're right where you need to be.",
        "A little tap, a little calm. Keep popping at your own pace.",
        "Perfectly gentle! Let each sound be a reminder to breathe.",
        "Enjoy each pop as it brings a soft release.",
        "Wonderful! Feel free to float along with the bubbles.",
        "Just relax and let your mind drift with each gentle tap.",
        "Well done! Sometimes, all it takes is a small touch to bring calm."
    ],
    "Breathing Exercise": [
        "Well done. Take a moment to feel the calm that each breath brought you.",
        "You did great! Remember, peace is just a breath away.",
        "Feel the stillness within you. Carry this calmness with you.",
        "Wonderful job! With each breath, you've created a moment of peace.",
        "Your breath is a powerful tool for calm. Remember this feeling.",
        "You’ve done beautifully. Let this quiet energy stay with you.",
        "Great work! Feel the release in every part of you.",
        "Each breath has brought you here. Enjoy this calm space you’ve created.",
        "You’re amazing! Relaxed, refreshed, and centered. Carry this with you.",
        "Your calm is within reach anytime. Breathe and reconnect whenever you need."
    ],
    "Guided Meditation": [
        "You’ve completed this journey. Carry the peace of the forest (or ocean) with you.",
        "Well done. May the calm of nature stay with you, bringing balance to your day.",
        "You've found a moment of peace. Let the gentle waves (or rustling leaves) remind you of the quiet within.",
        "Wonderful. You’ve connected to nature’s calm—hold on to that sense of ease.",
        "Beautifully done. Remember, the tranquility of the forest (or ocean) is always within reach.",
        "Great job! Let the memory of this moment stay with you as a source of peace.",
        "You've created space for calm. Hold on to this feeling, like the steady rhythm of the waves.",
        "You did well. Just as the forest (or ocean) is steady and calm, you can return to this peace whenever you wish.",
        "This calm is yours to keep. Let it be a gentle reminder in your day-to-day moments.",
        "Take a deep breath, and let this calm ground you whenever you need it."
    ],
    "Reflection Jornal": [
        "Well done. Every thought you put down is a step towards clarity and growth.",
        "You took time for yourself today, and that’s something to be proud of.",
        "Your reflections matter. Keep going—you’re moving forward with each word.",
        "Today was a step forward. Remember, even small reflections lead to big insights.",
        "Thank you for sharing your thoughts. Embrace each moment on your journey.",
        "You've made space for your thoughts. You’re doing an amazing job.",
        "Take pride in your reflections. Every thought brings you closer to understanding.",
        "You are progressing beautifully. Every word is a reminder of your strength.",
        "You showed up for yourself today. Keep nurturing this time just for you.",
        "Well done! Your reflections are valuable, just like the time you give yourself."
    ],
    "Gratitude Garden": [
        "Beautiful! Another seed of gratitude has taken root in your garden.",
        "You’ve planted a new memory of gratitude. Watch your garden bloom with joy.",
        "Well done! Every thankful thought brings more color to your world.",
        "Lovely! Your garden grows brighter with each grateful reflection.",
        "Another flower of gratitude blooms! Cherish each new addition to your garden.",
        "Your garden is blossoming beautifully. Each bloom is a reminder of joy.",
        "You’re cultivating gratitude, one thought at a time. Keep growing!",
        "Wonderful! Each plant symbolizes something special in your life.",
        "Your garden of gratitude is thriving. Take a moment to admire its beauty.",
        "Every flower holds a memory. Thank you for growing this garden of gratitude."
    ]
};

export default function PopupFeedback({whichActivity, isVisible}) {

    const FB_conve = Object.entries(FB);
    const Messages_conve = Object.values(Messages);

    // returns the related 10 messages depending on the activity that was partook prior.
    let PrevAct = Messages_conve[Math.floor(Math.random() * Messages_conve.length)];
    let SelectedMessage = PrevAct[Math.floor(Math.random() * PrevAct.length)];
    let chosenFB = FB_conve[Math.floor(Math.random() * FB_conve.length)];

    console.log(chosenFB);
    return(
        <div className='feedbackcon' style={{display: isVisible ? 'block' : 'none'}}>  
            <div className='feedback' style={{
                backgroundImage: `url(${chosenFB[1]})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}>
                <Cross top="10" left="400"/>
                <p> {SelectedMessage} </p>
            </div>
        </div>
    )
}