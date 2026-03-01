import { CONFIG } from '../config';

const Header = ({ onHome, client }) => (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div
                onClick={onHome}
                className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            >
                <div className="bg-white rounded p-1 flex items-center justify-center">
                    <img src={client.headerLogo || `${import.meta.env.BASE_URL}${client.logo}`} alt={`${client.name} Logo`} className="h-10 w-auto" />
                </div>
                <div>
                    <h1 className="font-serif text-xl font-bold tracking-wide">{client.name}</h1>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">{client.description}</p>
                </div>
            </div>
        </div>
    </header>
);

export default Header;
