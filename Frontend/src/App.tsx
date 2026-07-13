import { useState } from 'react';
import HomePage from './pages/HomePage';
import QueuePage from './pages/QueuePage';
import SimulationPage from './pages/SimulationPage';
import MM1Page from './pages/queuemodels/MM1Page';
import MMSPage from './pages/queuemodels/MMSPage';
import MG1Page from './pages/queuemodels/MG1Page';
import MGSPage from './pages/queuemodels/MGSPage';
import GG1Page from './pages/queuemodels/GG1Page';
import GGSPage from './pages/queuemodels/GGSPage';
import MMSSimPage from './pages/simulate/MMSSimPage';
import MGSSimPage from './pages/simulate/MGSSimPage';
import GGSSimPage from './pages/simulate/GGSSimPage';
import LiveSimPage from './pages/simulate/LiveSimPage';
import DownloadPage from './pages/DownloadPage';

export type Route =
  | 'home'
  | 'queue'
  | 'simulation'
  | 'mm1' | 'mms' | 'mg1' | 'mgs' | 'gg1' | 'ggs'
  | 'sim-mms' | 'sim-mgs' | 'sim-ggs' | 'sim-live'
  | 'download';

export default function App() {
  const [route, setRoute] = useState<Route>('home');

  const navigate = (r: Route) => setRoute(r);

  switch (route) {
    case 'home':       return <HomePage navigate={navigate} />;
    case 'queue':      return <QueuePage navigate={navigate} />;
    case 'simulation': return <SimulationPage navigate={navigate} />;
    case 'mm1':        return <MM1Page navigate={navigate} />;
    case 'mms':        return <MMSPage navigate={navigate} />;
    case 'mg1':        return <MG1Page navigate={navigate} />;
    case 'mgs':        return <MGSPage navigate={navigate} />;
    case 'gg1':        return <GG1Page navigate={navigate} />;
    case 'ggs':        return <GGSPage navigate={navigate} />;
    case 'sim-mms':    return <MMSSimPage navigate={navigate} />;
    case 'sim-mgs':    return <MGSSimPage navigate={navigate} />;
    case 'sim-ggs':    return <GGSSimPage navigate={navigate} />;
    case 'sim-live':   return <LiveSimPage navigate={navigate} />;
    case 'download':   return <DownloadPage navigate={navigate} />;
    default:           return <HomePage navigate={navigate} />;
  }
}
