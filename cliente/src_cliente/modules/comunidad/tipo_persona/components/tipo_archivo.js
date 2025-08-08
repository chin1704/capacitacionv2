import {useState} from "react";
import {createTipoPersona} from "../../../../services/comunidad/tipoPersonaServices"


const NuevoTipoPersona = ()=>{
	const [ formData, setFormData]=useState({ 
			descripcion_tipo_persona:"", observaciones_tipo_persona:""
		 });
	const handleSubmit = async (e )=>{  // arrowFunction  () => {} parentesis pasa 1 o mas parametros {} = ejecutan la funcionalidad de la funcion
		e.preventDefault();
		try{
			const nuevoTipoPersona=await createTipoPersona(formData);
			alert('tipo Usuario creado correctamente ');
		}
		catch(error ){
			console.error('Ha ocurrido un fallo revise ', error);
		}
	}// handleSubmit
	const handleChange=(e)=>{
			const {name, value}=e.target;  // formData=contiene la informacion que envia en la peticion GET
			setFormData({ ...formData, [name]:value }); // setFormData asigna valor a los campos del formData setFormData=como  setters POO

	}//---handelChange

	return(
		<div>
			<form id="tipoPersona" onSubmit={handleSubmit}  >
				<input type="label" value="codigo" />
				
				<input type="text" name="descripcion_tipo_persona" value={formData.descripcion_tipo_persona}  onChange={handleChange} placeholder="Tipo de Persona"/>
				<input type="text" name="observaciones_tipo_persona" value={formData.observaciones_tipo_persona} onChange={handleChange} placeholder="Observaciones"/>
				<button type="submit"   >Guardar </button>
			</form>
		</div>


	)

}
export default NuevoTipoPersona;
