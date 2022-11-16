
import { zodResolver } from '@hookform/resolvers/zod';
import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import * as zod from 'zod';

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number()
  .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
  .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})


export function Home() {
  const {register, handleSubmit, watch} = useForm({
    resolver: zodResolver(newCycleFormValidationSchema),
  })

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

  const task = watch('task')

  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
        <label htmlFor="task">Vou trabalhar em</label>
        <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        {...register('task')}
        />

        <datalist id="task-suggestions">
        </datalist>

        <label htmlFor="">durante</label>
        <MinutesAmountInput
        type="number"
         id="minutesAmount"
         placeholder="00"
         step={5}
         min={5}
         max={60}
         {...register('minutesAmount', {valueAsNumber: true})}
         />

        <span>minutos.</span>
        </FormContainer>

      <CountdownContainer>
        <span>0</span>
        <span>0</span>
        <Separator>:</Separator>
        <span>0</span>
        <span>0</span>
      </CountdownContainer>

      <StartCountdownButton disabled={!task} type="submit">
        <Play size={24} />
        Começar</StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
