import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Activity, Server, Clock, Zap, Search, ShieldCheck, Globe, Crown } from 'lucide-react';

const topPlayers: any[] = [];

export default function OnlinePage({ online }: { online: number, key?: React.Key }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      exit={{ opacity: 0, y: -50, scale: 0.95, rotateX: 10 }}
      transition={{ type: "spring", stiffness: 150, damping: 20 }}
      className="w-full max-w-6xl flex flex-col items-center relative z-10 will-change-transform"
      style={{ perspective: 1000, transform: 'translate3d(calc(var(--mouse-x, 0) * -0.5px), calc(var(--mouse-y, 0) * -0.5px), 0)', transition: 'transform 0.1s ease-out' }}
    >
      <motion.h2 
        animate={{ textShadow: ['0px 0px 0px var(--theme-glow)', '0px 0px 30px var(--theme-glow)', '0px 0px 0px var(--theme-glow)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl md:text-7xl font-display font-black mb-10 text-center tracking-tighter text-white uppercase drop-shadow-2xl transition-all duration-500"
      >
        СТАТИСТИКА
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full mb-10">
        {/* Main Online Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl relative overflow-hidden group shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--theme-main)]/10 blur-[80px] rounded-full pointer-events-none transition-colors duration-500" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                <span className="text-white/60 font-bold tracking-widest uppercase text-sm">Сервер закрыт</span>
              </div>
              <h3 className="text-5xl font-display font-black text-white mb-2 drop-shadow-md">ONEWORLD</h3>
              <p className="text-white/50 font-medium text-lg">OneWorld.me</p>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-[#050505]/50 border border-white/10 rounded-[2rem] min-w-[220px] shadow-inner relative overflow-hidden group-hover:border-[var(--theme-main)]/30 transition-colors duration-500">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,var(--theme-glow)_360deg)] opacity-20"
              />
              <div className="absolute inset-[1px] bg-[#0a0a0a]/90 rounded-[2rem] z-0" />
              
              <div className="relative z-10 flex flex-col items-center">
                <Users size={36} className="text-[var(--theme-main)] mb-3 transition-colors duration-500 drop-shadow-[0_0_10px_var(--theme-glow)]" />
                <div className="text-6xl font-display font-black text-white tracking-tighter drop-shadow-lg">
                  {online}
                  <span className="text-2xl text-white/30 font-medium ml-1">/ 1000</span>
                </div>
                <div className="text-xs text-[var(--theme-main)] font-bold uppercase tracking-widest mt-3 transition-colors duration-500">Игроков онлайн</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Server Metrics */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <MetricCard icon={<Activity />} title="TPS Сервера" value="-" subtitle="Оффлайн" color="text-red-400" />
          <MetricCard icon={<Clock />} title="Аптайм" value="-" subtitle="Тех. работы" color="text-zinc-400" />
          <MetricCard icon={<Zap />} title="Пинг (МСК)" value="-" subtitle="Нет связи" color="text-zinc-400" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Player Search & Functions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl flex flex-col gap-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <h3 className="text-xl font-display font-black uppercase tracking-widest flex items-center gap-3">
            <Search className="text-[var(--theme-main)] transition-colors duration-500" />
            Поиск игрока
          </h3>
          
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[var(--theme-main)] to-[var(--theme-sec)] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <input 
              type="text" 
              placeholder="Никнейм..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-[#050505] border border-white/10 rounded-xl py-4 pl-5 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--theme-main)]/50 transition-colors"
            />
            <Search size={20} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--theme-main)] transition-colors" />
          </div>

          <div className="flex-grow flex flex-col gap-3 mt-2">
            <FunctionButton icon={<ShieldCheck />} text="Проверить баны" />
            <FunctionButton icon={<Globe />} text="Карта мира (Web)" />
            <FunctionButton icon={<Server />} text="Статус узлов" />
          </div>
        </motion.div>

        {/* Top Players */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-[#0a0a0a]/80 border border-white/10 rounded-[2rem] p-8 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        >
          <h3 className="text-xl font-display font-black uppercase tracking-widest flex items-center gap-3 mb-8">
            <Crown className="text-[var(--theme-main)] transition-colors duration-500" />
            Топ игроков недели
          </h3>

          {topPlayers.length > 0 ? (
            <div className="flex flex-col gap-3">
              {topPlayers.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[var(--theme-main)]/20 flex items-center justify-center font-black text-[var(--theme-main)] transition-colors duration-500">
                      #{idx + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{player.name}</div>
                      <div className="text-xs font-bold text-white/50">{player.rank}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm font-medium text-white/40">
                    <div className="hidden sm:flex items-center gap-2">
                      <Clock size={14} /> {player.playtime}
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={14} className="text-emerald-500" /> {player.ping} ms
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-white/30 bg-white/[0.02] rounded-2xl border border-white/5 border-dashed">
              <Crown size={56} className="mb-6 opacity-20" />
              <p className="font-display font-black uppercase tracking-widest text-xl">Игроков пока нет</p>
              <p className="text-sm mt-2 font-medium">Сервер еще не открыт</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

function MetricCard({ icon, title, value, subtitle, color }: { icon: React.ReactNode, title: string, value: string, subtitle: string, color: string }) {
  return (
    <div className="bg-[#0a0a0a]/80 border border-white/10 rounded-2xl p-6 flex items-center gap-5 backdrop-blur-2xl hover:bg-white/5 transition-colors group shadow-[0_5px_20px_rgba(0,0,0,0.3)]">
      <div className={`p-4 rounded-xl bg-white/5 border border-white/5 group-hover:scale-110 transition-transform duration-500 ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-sm font-bold text-white/50 mb-1">{title}</div>
        <div className="text-2xl font-display font-black text-white tracking-tight">{value}</div>
        <div className={`text-xs font-bold mt-1 ${color}`}>{subtitle}</div>
      </div>
    </div>
  );
}

function FunctionButton({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <button className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group w-full text-left">
      <div className="text-[var(--theme-main)] transition-colors duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_var(--theme-glow)]">
        {icon}
      </div>
      <span className="font-bold text-white/80 group-hover:text-white transition-colors">{text}</span>
    </button>
  );
}
