import { useState } from "react";
import {createProvincia} from "../../../../services/comunidad/provincia.services";

const CrearProvincia = () => {
    const [formData, setFormData] = useState({
        nombre_provincia: "",
    });
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const nuevaProvincia = await createProvincia(formData);
            alert('Provincia creada correctamente');
        } catch (error) {
            console.error('Ha ocurrido un fallo en crear provincia, revise ', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

	return (
		<div>
			<form id="crearProvincia" onSubmit={handleSubmit}>
				<input
					type="text"
					name="nombre_provincia"
					value={formData.nombre_provincia}
					onChange={handleChange}
					placeholder="Nombre de la Provincia"
				/>
				<button type="submit">Crear Provincia</button>
			</form>
		</div>
	);
};

export default CrearProvincia;
