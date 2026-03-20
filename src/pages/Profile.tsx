import { useAuth } from "@/store/use-auth";
import { Link, useLocation } from "wouter";
import { User, LogOut, Package, Settings } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setLocation("/auth");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  return (
    <div className="min-h-screen pt-32 pb-24 max-w-4xl mx-auto px-4">
      <div className="glass-card rounded-3xl p-10 flex flex-col md:flex-row items-center md:items-start gap-10">
        
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-display font-bold text-black shrink-0 shadow-2xl shadow-primary/20 border-4 border-black">
          {user.name.charAt(0)}
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="font-display text-4xl font-bold mb-2">{user.name}</h1>
          <p className="text-muted-foreground flex items-center justify-center md:justify-start gap-2 mb-8">
            <User size={16} /> {user.email}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/orders" className="flex items-center gap-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl border border-white/10 transition-colors">
              <div className="p-3 bg-primary/20 text-primary rounded-xl"><Package size={20}/></div>
              <div className="text-left">
                <h4 className="font-bold text-white">Order History</h4>
                <p className="text-xs text-muted-foreground">View past orders</p>
              </div>
            </Link>
            
            {user.role === 'admin' && (
              <Link href="/admin" className="flex items-center gap-4 bg-accent/10 hover:bg-accent/20 p-4 rounded-2xl border border-accent/20 transition-colors">
                <div className="p-3 bg-accent/20 text-accent rounded-xl"><Settings size={20}/></div>
                <div className="text-left">
                  <h4 className="font-bold text-white">Admin Panel</h4>
                  <p className="text-xs text-muted-foreground">Manage restaurant</p>
                </div>
              </Link>
            )}
          </div>
          
          <button onClick={handleLogout} className="mt-8 flex items-center gap-2 text-red-400 hover:text-red-300 font-medium transition-colors mx-auto md:mx-0">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
