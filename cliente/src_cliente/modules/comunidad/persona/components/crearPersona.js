import {useState } from "react";
import {createPersona} from "../../../../services/comunidad/persona.services";

const CrearPersona = () => {
const [formData, setFormData] = useState({
        apellido_persona: "",
        nombre_persona: "",
        direccion_persona: "",
        correo_persona: "",
        telefono_persona: {},
        foto_persona: "",
        estado_persona: ""
        });
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const nuevaPersona = await createPersona(formData);
            alert('Persona creada correctamente');
        } catch (error) {
            console.error('Ha ocurrido un fallo en crear persona, revise ', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div>
            <form id="crearPersona" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="apellido_persona"
                    value={formData.apellido_persona}
                    onChange={handleChange}
                    placeholder="Apellido de la Persona"
                />
                <br/>
                <input
                    type="text"
                    name="nombre_persona"
                    value={formData.nombre_persona}
                    onChange={handleChange}
                    placeholder="Nombre de la Persona"
                />
                <br/>
                <input
                    type="text"
                    name="direccion_persona"
                    value={formData.direccion_persona}
                    onChange={handleChange}
                    placeholder="Dirección de la Persona"
                />
                <br/>
                <input
                    type="email"
                    name="correo_persona"
                    value={formData.correo_persona}
                    onChange={handleChange}
                    placeholder="Correo de la Persona"
                />
                <br/>
                <input
                    type="text"
                    name="telefono_persona"
                    value={formData.telefono_persona}
                    onChange={handleChange}
                    placeholder="Teléfono de la Persona"
                />
                <br/>
                <input
                    type="text"
                    name="foto_persona"
                    value={formData.foto_persona}
                    onChange={handleChange}
                    placeholder="Foto de la Persona"
                />
                <br/>
                <input
                    type="text"
                    name="estado_persona"
                    value={formData.estado_persona}
                    onChange={handleChange}
                    placeholder="Estado de la Persona"
                />
                <br/>
                <button type="submit">Crear Persona</button>
            </form>
        </div>
    );
}
export default CrearPersona;