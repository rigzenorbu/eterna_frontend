import { TokenTable } from '@/components/token-table';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Token Discovery</h1>
          <p className="text-gray-600">Real-time token trading data and analytics</p>
        </header>
        <TokenTable />
      </div>
    </main>
  );
}
