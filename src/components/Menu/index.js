import { useNavigate } from "react-router-dom"

export function Menu({ children }) {
    
    const navigate = useNavigate()
    
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-ligth">
                <div className="container-fluid px-5">
                    <span className="navbar-brand" style={{ fontWeight: 'bold' }}>My System Finance</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item linkMenu" onClick={() => navigate('/')}>
                                <span className="nav-link active " aria-current="page">Home</span>
                            </li>
                            <li className="nav-item linkMenu" onClick={() => navigate('/inputs')} >
                                <span className="nav-link">Entradas</span>
                            </li>
                            <li className="nav-item linkMenu" onClick={() => navigate('/outputs')} >
                                <span className="nav-link">Saídas</span>
                            </li>
                            <li className="nav-item linkMenu" onClick={() => navigate('/users')} >
                                <span className="nav-link">Usuários</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div style={{ margin: '40px 60px' }}>
                {children}
            </div>
        </>
    )
}