{/* <hr className="border-gray-200 dark:border-gray-700" />

                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password de Registro"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password', {
                            required: "El password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El password debe tener mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && <MessageError>{errors.password.message}</MessageError>}
                </div> */}

{/* <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repetir Password"
                        className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
                        {...register('password_confirmation', {
                            required: "Repetir password es obligatorio",
                            validate: (value) => value === password || 'Los password no son iguales'
                        })}
                    />
                    {errors.password_confirmation && <MessageError>{errors.password_confirmation.message}</MessageError>}
                </div> */}
