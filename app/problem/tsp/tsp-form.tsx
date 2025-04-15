"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MatrixDistanceInput } from "@/components/ui/matrix-distance"
import { MatrixSchema, MatrixSchemaInfer } from "@/lib/schema"

const onSubmit = (values: MatrixSchemaInfer) => {
  console.log(values)
}

export const TspForm = () => {

    const form = useForm<MatrixSchemaInfer>({
        resolver: zodResolver(MatrixSchema),
        defaultValues: {
            capacity: 1,
            maxIter: 30,
            numParticles: 100,
            matrices: []
        },
    })

    return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacité</FormLabel>
              <FormControl>
                <Input min={1} type="number" {...field} />
              </FormControl>
              <FormDescription>
              Capacité maximale de transport autorisée.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxIter"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre d’itérations de l’algorithme PSO</FormLabel>
              <FormControl>
                <Input min={1} type="number" {...field} />
              </FormControl>
              <FormDescription>
              Nombre de fois que l’algorithme va s’exécuter pour optimiser les résultats.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="numParticles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              Nombre de particules utilisées dans le PSO
              </FormLabel>
              <FormControl>
                <Input min={1} type="number" {...field} />
              </FormControl>
              <FormDescription>
              Détermine le nombre d’agents explorant les solutions possibles
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="matrices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              Matrice de distances
              </FormLabel>
              <FormControl>

                <MatrixDistanceInput initialMatrix={field.value}  />

              </FormControl>
              <FormDescription>
              Indique les distances entre les différentes villes ou points.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          Appliquer l&#39;algorithme
        </Button>
      </form>
    </Form>

    )
}