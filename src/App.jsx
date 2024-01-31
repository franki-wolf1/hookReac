import { useRef } from "react";
import { useForm } from "react-hook-form";

function Formulario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",
      fechaNacimiento: "",
      password: "",
      confirmarPassword: "",
      pais: "co",
      archivo: "",
      aceptaTerminos: false,
    },
  });

  const password = useRef(null);
  password.current = watch("password", "");

  const onSubmit = handleSubmit((data) => {
    console.log(data); 
    reset();
  });

  return ( 
    <form onSubmit={onSubmit}>
      <h3 class="padingform">Formulario react-hook-form / Franki B</h3>
      <div class="padingform">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          {...register("nombre", {
            required: {
              value: true,
              message: "Nombre es requerido",
            },
            maxLength: 20,
            minLength: 2,
          })}
        />
        {errors.nombre?.type === "required" && <span>Nombre requerido</span>}
        {errors.nombre?.type === "maxLength" && (
          <span>Nombre no debe ser mayor a 20 caracteres</span>
        )}
        {errors.nombre?.type === "minLength" && (
          <span>Nombre debe ser mayor a 2 caracteres</span>
        )}
      </div>

      <div class="padingform">
        <label>Correo Electrónico:</label>
        <input
          type="email"
          name="correo"
          {...register("correo", {
            required: {
              value: true,
              message: "Correo es requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Correo no válido",
            },
          })}
        />
        {errors.correo && <span>{errors.correo.message}</span>}
      </div>

      <div class="padingform">
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          {...register("fechaNacimiento", {
            required: {
              value: true,
              message: "Fecha de nacimiento es requerida",
            },
            validate: (value) => {
              const fechaNacimiento = new Date(value);
              const fechaActual = new Date();
              const edad =
                fechaActual.getFullYear() - fechaNacimiento.getFullYear();
              return edad >= 18 || "Debes ser mayor de edad";
            },
          })}
        />
        {errors.fechaNacimiento && (
          <span>{errors.fechaNacimiento.message}</span>
        )}
      </div>

      <div class="padingform">
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          {...register("password", {
            required: {
              value: true,
              message: "Contraseña es requerida",
            },
            minLength: {
              value: 6,
              message: "Contraseña debe ser mayor a 6 caracteres",
            },
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <div class="padingform">
        <label>Confirma Contraseña:</label>
        <input
          type="password"
          name="confirmarPassword"
          {...register("confirmarPassword", {
            required: {
              value: true,
              message: "Confirmar contraseña es requerida",
            },
            minLength: {
              value: 6,
              message: "Confirmar contraseña debe ser mayor a 6 caracteres",
            },
            validate: (value) =>
              value === password.current || "Las contraseñas no coinciden",
          })}
        />
        {errors.confirmarPassword && (
          <span>{errors.confirmarPassword.message}</span>
        )}
      </div>

      <div class="padingform">
        <label htmlFor="pais">Pais:</label>
        <select name="pais" id="pais" {...register("pais")}>
          <option value="mx">México</option>
          <option value="co">Colombia</option>
          <option value="ar">Argentina</option>
        </select>

        {watch("pais") === "ar" && (
          <input
            type="text"
            placeholder="Provincia"
            {...register("provincia", {
              required: {
                value: true,
                message: "Provincia es requerida",
              },
            })}
          />
        )}
      </div>

      <div class="padingform">
        <label htmlFor="archivo">Subir archivo:</label>
        <input
          type="file"
          onChange={(e) => {
            setValue("archivo", e.target.files[0].name);
          }}
        />
        {errors.archivo && <span>{errors.archivo.message}</span>}
      </div>

      <div class="row">
      <input class="col-2"
          type="checkbox"
          name="aceptaTerminos"
          {...register("aceptaTerminos", {
            required: {
              value: true,
              message: "Acepta los términos y condiciones",
            },
          })}
        />
        <label class="col">Acepto los términos y condiciones</label>
        {errors.aceptaTerminos && <span>{errors.aceptaTerminos.message}</span>}
      </div>

      
      <div class="padingform">
      <button type="submit">Enviar</button>

      <pre style={{ width: "400px" }}>{JSON.stringify(watch(), null, 2)}</pre>
      <h3 >Hello {watch("nombre")}</h3>
      </div>
    </form>
  );
}

export default Formulario;
