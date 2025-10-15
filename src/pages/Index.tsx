import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const heroes = [
    { name: 'GingerBrave', emoji: '🍪', color: 'from-orange-400 to-amber-600' },
    { name: 'Wizard Cookie', emoji: '🧙', color: 'from-purple-400 to-indigo-600' },
    { name: 'Strawberry Cookie', emoji: '🍓', color: 'from-pink-400 to-rose-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-golden via-pink to-brown">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="text-7xl mb-6 animate-float">🏰</div>
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            COOKIE RUN KINGDOM
          </h1>
          <p className="text-2xl text-white/90 font-semibold">Cannon Shooting Game</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {heroes.map((hero, index) => (
            <Card 
              key={index}
              className="p-8 text-center hover:scale-105 transition-transform cursor-pointer animate-fade-in bg-white/95 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-7xl mb-4 animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                {hero.emoji}
              </div>
              <h3 className="text-xl font-bold text-brown mb-2">{hero.name}</h3>
              <div className={`h-2 rounded-full bg-gradient-to-r ${hero.color} mt-4`} />
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <Card className="p-8 text-center hover:scale-105 transition-transform bg-white/95 backdrop-blur-sm animate-fade-in">
            <Icon name="Target" size={64} className="mx-auto mb-4 text-brown" />
            <h2 className="text-2xl font-bold text-brown mb-4">Играть</h2>
            <p className="text-muted-foreground mb-6">
              Защищай королевство от врагов! Стреляй из пушки и набирай очки.
            </p>
            <Button 
              onClick={() => navigate('/game')}
              size="lg"
              className="w-full bg-gradient-to-r from-golden to-pink text-white font-bold text-xl"
            >
              <Icon name="Zap" className="mr-2" />
              Начать бой
            </Button>
          </Card>

          <Card className="p-8 text-center hover:scale-105 transition-transform bg-white/95 backdrop-blur-sm animate-fade-in">
            <Icon name="Trophy" size={64} className="mx-auto mb-4 text-golden" />
            <h2 className="text-2xl font-bold text-brown mb-4">Рейтинг</h2>
            <p className="text-muted-foreground mb-6">
              Проверь свои результаты и сравни с другими игроками!
            </p>
            <Button 
              onClick={() => navigate('/leaderboard')}
              size="lg"
              className="w-full bg-gradient-to-r from-brown to-darkBrown text-white font-bold text-xl"
            >
              <Icon name="Award" className="mr-2" />
              Топ игроков
            </Button>
          </Card>
        </div>

        <Card className="mt-12 p-8 max-w-2xl mx-auto text-center bg-white/95 backdrop-blur-sm animate-fade-in">
          <h3 className="text-xl font-bold text-brown mb-4">Враги королевства</h3>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-6xl mb-2">🌑</div>
              <p className="text-sm text-brown font-semibold">Shadow Milk Cookie</p>
            </div>
            <div className="text-6xl text-brown flex items-center">⚔️</div>
            <div className="text-center">
              <div className="text-6xl mb-2">🔥</div>
              <p className="text-sm text-brown font-semibold">Burning Spice Cookie</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;