import { useEffect, useState } from "react";
import { getProvincia } from "../../../../services/comunidad/provincia.services";

const VerProvincia = () => {
	const [provincia, setProvincia] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProvincias = async () =>{
            try {
                const response = await getProvincia(); // Asumiendo que getProvincia es una función que hace la petición
                setProvincia(response);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProvincias();
    }, []);

    if (loading) return <div>Cargando...</div>;

    if (error) return <div>Error al cargar provincias</div>;

    return (
		<div>
			<center>
                <table>
                    <thead>
                        <tr>
                            <th>ID Provincia</th>
                            <th>Nombre de la Provincia</th>
                        </tr>
                    </thead>
                    <tbody>
                        {provincia.map((provincia) => (
                            <tr key={provincia.id_provincia}>
                                <td>{provincia.id_provincia}</td>
                                <td>{provincia.nombre_provincia}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </center>
		</div>
	);
};
export default VerProvincia;