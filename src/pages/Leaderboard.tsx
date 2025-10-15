import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  emoji: string;
}

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [playerScore, setPlayerScore] = useState(0);

  useEffect(() => {
    const savedLeaders = localStorage.getItem('cookieRunLeaders');
    if (savedLeaders) {
      setLeaders(JSON.parse(savedLeaders));
    } else {
      const defaultLeaders: LeaderboardEntry[] = [
        { id: 1, name: 'GingerBrave', score: 150, emoji: '🍪' },
        { id: 2, name: 'Wizard Cookie', score: 120, emoji: '🧙' },
        { id: 3, name: 'Strawberry Cookie', score: 100, emoji: '🍓' },
        { id: 4, name: 'Brave Cookie', score: 85, emoji: '⚔️' },
        { id: 5, name: 'Knight Cookie', score: 70, emoji: '🛡️' }
      ];
      setLeaders(defaultLeaders);
      localStorage.setItem('cookieRunLeaders', JSON.stringify(defaultLeaders));
    }
  }, []);

  const addScore = () => {
    if (!playerName.trim() || playerScore <= 0) return;

    const cookieEmojis = ['🍪', '🧙', '🍓', '⚔️', '🛡️', '🎯', '⭐', '🏆'];
    const randomEmoji = cookieEmojis[Math.floor(Math.random() * cookieEmojis.length)];

    const newEntry: LeaderboardEntry = {
      id: Date.now(),
      name: playerName,
      score: playerScore,
      emoji: randomEmoji
    };

    const updated = [...leaders, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaders(updated);
    localStorage.setItem('cookieRunLeaders', JSON.stringify(updated));
    setPlayerName('');
    setPlayerScore(0);
  };

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-golden via-pink to-brown p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>
          <h1 className="text-4xl font-bold text-white">Рейтинг</h1>
          <div className="w-24" />
        </div>

        <Card className="p-8 mb-6 bg-white/95 backdrop-blur-sm animate-fade-in">
          <h2 className="text-2xl font-bold text-brown mb-6 flex items-center gap-2">
            <Icon name="Trophy" className="text-golden" />
            Топ игроков
          </h2>

          <div className="space-y-3">
            {leaders.map((leader, index) => (
              <div
                key={leader.id}
                className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-white to-muted hover:scale-105 transition-transform"
              >
                <div className="text-3xl min-w-[48px] text-center">
                  {index < 3 ? medals[index] : `#${index + 1}`}
                </div>
                <div className="text-4xl">{leader.emoji}</div>
                <div className="flex-1">
                  <div className="font-bold text-brown text-lg">{leader.name}</div>
                </div>
                <div className="text-2xl font-bold text-golden">{leader.score}</div>
              </div>
            ))}
          </div>

          {leaders.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              Пока нет результатов. Будь первым!
            </div>
          )}
        </Card>

        <Card className="p-6 bg-white/95 backdrop-blur-sm animate-fade-in">
          <h3 className="text-xl font-bold text-brown mb-4">Добавить результат</h3>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Твоё имя"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="text-lg"
            />
            <Input
              type="number"
              placeholder="Твой счет"
              value={playerScore || ''}
              onChange={(e) => setPlayerScore(Number(e.target.value))}
              className="text-lg"
            />
            <Button
              onClick={addScore}
              className="w-full bg-gradient-to-r from-golden to-pink text-white font-bold text-lg"
              disabled={!playerName.trim() || playerScore <= 0}
            >
              <Icon name="Plus" className="mr-2" />
              Добавить
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
