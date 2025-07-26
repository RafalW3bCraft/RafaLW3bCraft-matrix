<<<<<<< HEAD
import { Button } from '@/components/ui/button';
import { Shield, Lock, Users, Bot } from 'lucide-react';

export default function PublicAccess() {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome to RafalW3bCraft</h2>
        <p className="text-cyan-400">Open access to cybersecurity content and resources</p>
      </div>
      
      <Button
        onClick={() => window.location.href = '/'}
        variant="outline"
        className="w-full bg-zinc-900 border-cyan-500/50 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 py-6"
      >
        <Shield className="w-5 h-5" />
        Explore Portfolio
=======

import { Button } from '@/components/ui/button';
import { Shield, Lock } from 'lucide-react';

export default function AdminOnlyAccess() {
  return (
    <div className="flex flex-col space-y-4 w-full max-w-sm mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">RafalW3bCraft</h2>
        <p className="text-cyan-400">Admin-Only Access System</p>
      </div>
      
      <Button
        onClick={() => window.location.href = '/admin-login'}
        variant="outline"
        className="w-full bg-zinc-900 border-cyan-500/50 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 py-6"
      >
        <Lock className="w-5 h-5" />
        Admin Login
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
      </Button>

      <div className="text-center mt-6">
        <p className="text-zinc-400 text-sm">
<<<<<<< HEAD
          All content is freely accessible - no authentication required
=======
          This system is restricted to administrators only
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
        </p>
      </div>

      <div className="border-t border-zinc-700 pt-6 mt-6">
<<<<<<< HEAD
        <h3 className="text-white font-semibold mb-3">Available Features:</h3>
        <ul className="text-zinc-300 text-sm space-y-2">
          <li className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            Browse cybersecurity blog posts
          </li>
          <li className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            View GitHub project showcases
          </li>
          <li className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-cyan-400" />
            Access portfolio and services
          </li>
          <li className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Contact for professional services
=======
        <h3 className="text-white font-semibold mb-3">System Status:</h3>
        <ul className="text-zinc-300 text-sm space-y-2">
          <li className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Admin-only authentication active
          </li>
          <li className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            OAuth functionality disabled
          </li>
          <li className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            User registration disabled
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
          </li>
        </ul>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> b0a6a12 (intiate personal portfolio site and more)
