export default function useRandomAnswer() {
    const getRandomAnswer = () => (Math.random() < 0.5 ? 'Yes' : 'No');
  
    return getRandomAnswer;
  }
