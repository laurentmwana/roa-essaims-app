import { z } from "zod"

export const KnapsackSchema = z.object({
  capacity: z.coerce.number({ invalid_type_error: 'La capacité doit être un nombre.' })
    .min(1, 'La capacité doit être supérieure à zéro.'),

  maxIter: z.coerce.number({ invalid_type_error: 'Le nombre d’itérations doit être un nombre.' })
    .min(1, 'Le nombre d’itérations doit être supérieur à zéro.'),

  numParticles: z.coerce.number({ invalid_type_error: 'Le nombre de particules doit être un nombre.' })
    .min(1, 'Le nombre de particules doit être supérieur à zéro.'),

  items: z.array(z.object({
    weight: z.coerce.number({ invalid_type_error: 'Le poids doit être un nombre.' })
      .min(1, 'Le poids doit être supérieur à zéro.'),

    value: z.coerce.number({ invalid_type_error: 'La valeur doit être un nombre.' })
      .min(0, 'La valeur doit être positive ou nulle.'),

    obj: z.string().min(1, 'Le nom de l’objet est requis.'),
  })).min(1, 'Au moins un objet est requis.'),
})

export type KnapsackSchemaInfer = z.infer<typeof KnapsackSchema>

export const MatrixSchema =  z.object({
  capacity: z.coerce.number({ invalid_type_error: 'La capacité doit être un nombre.' })
    .min(1, 'La capacité doit être supérieure à zéro.'),

  maxIter: z.coerce.number({ invalid_type_error: 'Le nombre d’itérations doit être un nombre.' })
    .min(1, 'Le nombre d’itérations doit être supérieur à zéro.'),

  numParticles: z.coerce.number({ invalid_type_error: 'Le nombre de particules doit être un nombre.' })
    .min(1, 'Le nombre de particules doit être supérieur à zéro.'),

    matrices: z.array(
      z.array(
        z.number().min(0, "Les distances doivent être positives ou nulles")
      )
    ).refine(matrix => {
      const size = matrix.length
      return matrix.every(row => row.length === size)
    }, {
      message: "La matrice doit être carrée (même nombre de lignes et de colonnes)",
    })
})


export type MatrixSchemaInfer = z.infer<typeof MatrixSchema>
