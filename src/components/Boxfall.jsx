import React, { useState, useEffect } from 'react';
import './box.css';

const Boxfall = () => {
  const [score, setScore] = useState(0);
  const [balls, setBalls] = useState([]);
  const [catcherPosition, setCatcherPosition] = useState(40);

  
  const generateBall = () => {
    const newBall = {
      id: balls.length + 1,
      top: -10, 
      left: Math.random() * 90 + 5,
    };
    setBalls(prevBalls => [...prevBalls, newBall]);
  };

  // Function to move the balls downwards
  const moveBalls = () => {
    const movedBalls = balls.map(ball => ({
      ...ball,
      top: ball.top + 2, 
    }));
    setBalls(movedBalls);
  };

  // Function to handle catching a ball
  const catchBall = (ball) => {
    checkCollision(ball);
    
  };

  // Function to check collision with the catcher
  const checkCollision = (ball) => {
    if (
      ball.top >= 90 &&
      ball.left >= catcherPosition &&
      ball.left <= catcherPosition + 20
    ) {
      setScore(score + 10);
      resetBall(ball);
    } else if (ball.top >= 100) {
      gameOver();
    }
  };

  // Function to reset the ball when it's missed
  const resetBall = (ball) => {
    const newBalls = balls.filter(b => b.id !== ball.id);
    setBalls(newBalls);
  };

  // Function to handle game over
  const gameOver = () => {
    alert("Game Over! Your Score: " + score);
    setScore(0);
    setBalls([]);
  };

  // Event listener to move the catcher with mouse movement
  const handleMouseMove = (e) => {
    const catcherX = (e.clientX / window.innerWidth) * 100;
    setCatcherPosition(catcherX);
  };

  // useEffect to add mousemove event listener
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // useEffect to generate balls at intervals
  useEffect(() => {
    // Generate initial balls
    for (let i = 0; i < 4; i++) {
      generateBall();
    }
    // Set interval to generate new balls
    const intervalId = setInterval(generateBall, Math.random() * 2000 + 1000);
    // Cleanup function to clear interval
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // useEffect to move balls at intervals
  useEffect(() => {
    // Set interval to move balls
    const moveIntervalId = setInterval(moveBalls, 10);
    // Cleanup function to clear interval
    return () => {
      clearInterval(moveIntervalId);
    };
  }, [balls]);

  return (
    <div className='box-container'>
      <h1>Ball Catching Game</h1>
      <div className="gameboard">
        <div className="gamesection">
          <div className="boxes">
            {balls.map(ball => (
              <div
                key={ball.id}
                className="box"
                style={{ top: ball.top + '%', left: ball.left + '%' }}
                onClick={() => catchBall(ball)} 
              ></div>
            ))}
          </div>
          <div className="catchsection" style={{ left: catcherPosition + '%' }}>
            <div className="catch">
              <div className="catcher"></div>
            </div>
          </div>
        </div>
        <div className="scoreboardsection">
          <div className="score">
            <h1>Score</h1>
            <h1>{score}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boxfall;
