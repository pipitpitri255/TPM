
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User, Lock, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Background3D from '@/components/Background3D';
import { ThemeToggle } from '@/components/ui/theme-toggle';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      if (formData.username === 'admin' && formData.password === 'admin123') {
        toast({
          title: "Login berhasil!",
          description: "Selamat datang di Admin Panel TPM System.",
        });
        navigate('/admin');
      } else {
        toast({
          title: "Login gagal",
          description: "Username atau password tidak valid.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden cyber-grid flex items-center justify-center">
      <Background3D />
      
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 flex justify-between z-20">
        <Button
          variant="outline"
          onClick={() => navigate('/')}
          className="glass-card border-white/20 hover:border-blue-500/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <ThemeToggle />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <Card className="glass-card dark:glass-card light:glass-card-light border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 floating-gear">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl orbitron bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Panel
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              TPM Management System
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Masukkan username"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="input-futuristic pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="input-futuristic pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-6 text-lg"
              >
                {isLoading ? 'Memproses...' : 'Masuk Admin Panel'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/20 rounded-lg border border-white/10">
              <p className="text-xs font-semibold text-center mb-2 text-muted-foreground">
                Demo Credentials:
              </p>
              <div className="text-xs text-center space-y-1 text-muted-foreground">
                <p>Username: <span className="text-blue-400 font-mono">admin</span></p>
                <p>Password: <span className="text-blue-400 font-mono">admin123</span></p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
