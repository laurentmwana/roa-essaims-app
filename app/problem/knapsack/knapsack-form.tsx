"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { KnapsackSchema, type KnapsackSchemaInfer } from "@/lib/schema"
import { WeightValueInput } from "@/components/ui/weight-value"
import { useState } from "react"
import { KnapsackResult } from "./knapsack-result"
import { KnapsackStatementModal } from "./knapsack-statement"

export const KnapsackForm = () => {
  const [values, setValues] = useState<KnapsackSchemaInfer>()

  const form = useForm<KnapsackSchemaInfer>({
    resolver: zodResolver(KnapsackSchema),
    defaultValues: {
      capacity: 1,
      maxIter: 50,
      numParticles: 100,
      items: [],
    },
  })

  const onSubmit = (values: KnapsackSchemaInfer) => setValues(values)

  const onReset = () => {
    form.reset()
    setValues(undefined)
  }

  return values ? (
    <KnapsackResult onReset={onReset} values={values} />
  ) : (
    <div className="bg-card p-5 border rounded-md shadow-sm space-y-4">
    <KnapsackStatementModal />
      
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
                <FormDescription>Entrez la capacité maximale du sac à dos.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxIter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre d&#39;itérations de l&#39;algorithme PSO</FormLabel>
                <FormControl>
                  <Input min={1} type="number" {...field} />
                </FormControl>
                <FormDescription>Entrez le nombre d&#39;itérations à exécuter.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numParticles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de particules utilisées dans le PSO</FormLabel>
                <FormControl>
                  <Input min={1} type="number" {...field} />
                </FormControl>
                <FormDescription>Entrez le nombre total de particules.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="items"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Liste des objets (poids et valeur)</FormLabel>
                <FormControl>
                  <WeightValueInput
                    dataItems={field.value || []}
                    onChangeValueItem={(newItems: WeightValueItem[]) => {
                      field.onChange(newItems)
                    }}
                  />
                </FormControl>
                <FormDescription>Ajoutez un ou plusieurs objets avec leur poids et leur valeur.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Appliquer l&#39;algorithme</Button>
        </form>
      </Form>
    </div>
  )
}
