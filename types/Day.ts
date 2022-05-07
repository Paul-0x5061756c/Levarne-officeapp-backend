interface Day{
  name: string,
  available: boolean,
  note: string,
  persons: Array<Person>,
  capacity: number
}

export = Day