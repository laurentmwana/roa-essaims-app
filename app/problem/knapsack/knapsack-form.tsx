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
import { KnapsackSchema, KnapsackSchemaInfer } from "@/lib/schema"
import { WeightValueInput } from "@/components/ui/weight-value"

const onSubmit = (values: KnapsackSchemaInfer) => {
  console.log(values)
}

export const KnapsackForm = () => {

    const form = useForm<KnapsackSchemaInfer>({
        resolver: zodResolver(KnapsackSchema),
        defaultValues: {
            capacity: 1,
            maxIter: 30,
            numParticles: 100,
            items: [{
                obj: 'Object 1',
                value: 1,
                weight: 1
            }]
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
              Entrez la capacité maximale du sac à dos.
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
                Entrez le nombre d’itérations à exécuter.
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
                Entrez le nombre total de particules.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
              Liste des objets (poids et valeur)
              </FormLabel>
              <FormControl>
                <WeightValueInput
                    capacity={form.watch('capacity') || 1}
                    dataItems={field.value}
                />
              </FormControl>
              <FormDescription>
                Ajoutez un ou plusieurs objets avec leur poids et leur valeur.
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