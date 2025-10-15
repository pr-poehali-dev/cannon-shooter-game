import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Enemy {
  id: number;
  x: number;
  y: number;
  name: string;
  emoji: string;
}

const Game = () => {
  const [score, setScore] = useState(0);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [cannonAngle, setCannonAngle] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const enemyTypes = [
    { name: 'Shadow Milk Cookie', emoji: '🌑' },
    { name: 'Burning Spice Cookie', emoji: '🔥' }
  ];

  const heroes = [
    { name: 'GingerBrave', emoji: '🍪' },
    { name: 'Wizard Cookie', emoji: '🧙' },
    { name: 'Strawberry Cookie', emoji: '🍓' }
  ];

  useEffect(() => {
    if (!gameStarted) return;

    const spawnEnemy = () => {
      const enemy = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
      const newEnemy: Enemy = {
        id: Date.now(),
        x: Math.random() * 80 + 10,
        y: 0,
        name: enemy.name,
        emoji: enemy.emoji
      };
      setEnemies(prev => [...prev, newEnemy]);
    };

    const moveEnemies = setInterval(() => {
      setEnemies(prev => {
        const updated = prev.map(enemy => ({
          ...enemy,
          y: enemy.y + 2
        }));
        
        const filtered = updated.filter(enemy => enemy.y < 85);
        
        if (updated.some(enemy => enemy.y >= 85)) {
          setIsGameOver(true);
        }
        
        return filtered;
      });
    }, 100);

    const spawnInterval = setInterval(spawnEnemy, 2000);

    return () => {
      clearInterval(moveEnemies);
      clearInterval(spawnInterval);
    };
  }, [gameStarted]);

  const shoot = () => {
    if (!gameStarted || isGameOver) return;

    const hitRange = 15;
    const targetX = 50 + Math.cos((cannonAngle * Math.PI) / 180) * 30;
    
    setEnemies(prev => {
      const hit = prev.find(enemy => 
        Math.abs(enemy.x - targetX) < hitRange && enemy.y < 50
      );
      
      if (hit) {
        setScore(s => s + 10);
        return prev.filter(e => e.id !== hit.id);
      }
      
      return prev;
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setEnemies([]);
    setIsGameOver(false);
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-golden via-pink to-brown p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-white">Cookie Run Cannon</h1>
          <Card className="px-6 py-3">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={24} className="text-golden" />
              <span className="text-2xl font-bold text-brown">{score}</span>
            </div>
          </Card>
        </div>

        {!gameStarted && !isGameOver && (
          <Card className="p-12 text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-brown mb-4">Защити Королевство!</h2>
            <p className="text-muted-foreground mb-8">Стреляй из пушки и побеждай врагов</p>
            <Button 
              onClick={startGame}
              size="lg"
              className="bg-gradient-to-r from-golden to-pink text-white font-bold text-xl px-12"
            >
              Начать игру
            </Button>
          </Card>
        )}

        {isGameOver && (
          <Card className="p-12 text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-brown mb-4">Игра окончена!</h2>
            <p className="text-2xl text-muted-foreground mb-2">Твой счет:</p>
            <p className="text-5xl font-bold text-golden mb-8">{score}</p>
            <Button 
              onClick={restartGame}
              size="lg"
              className="bg-gradient-to-r from-golden to-pink text-white font-bold text-xl px-12"
            >
              Играть снова
            </Button>
          </Card>
        )}

        {gameStarted && !isGameOver && (
          <div className="relative">
            <Card className="p-6 bg-white/90 backdrop-blur-sm">
              <div className="relative h-[500px] bg-gradient-to-b from-blue-200 to-green-100 rounded-lg overflow-hidden">
                {enemies.map(enemy => (
                  <div
                    key={enemy.id}
                    className="absolute transition-all duration-100"
                    style={{
                      left: `${enemy.x}%`,
                      top: `${enemy.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div className="text-5xl animate-float">{enemy.emoji}</div>
                  </div>
                ))}

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-end gap-4">
                  {heroes.map((hero, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-5xl mb-2">{hero.emoji}</div>
                      <div className="text-xs text-brown font-semibold">{hero.name}</div>
                    </div>
                  ))}
                </div>

                <div 
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                  style={{
                    transform: `translateX(-50%) rotate(${-cannonAngle}deg)`,
                    transformOrigin: 'bottom center'
                  }}
                >
                  <div className="text-6xl">🔫</div>
                </div>

                <div className="absolute top-4 left-4">
                  <Icon name="Target" size={32} className="text-brown" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-4">
                  <label className="text-brown font-semibold min-w-[100px]">Угол: {cannonAngle}°</label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={cannonAngle}
                    onChange={(e) => setCannonAngle(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>

                <Button
                  onClick={shoot}
                  size="lg"
                  className="w-full bg-gradient-to-r from-golden to-pink text-white font-bold text-xl"
                >
                  <Icon name="Zap" className="mr-2" />
                  Выстрел!
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
