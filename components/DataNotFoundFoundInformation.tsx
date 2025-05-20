const DataNotFoundInformation = ({
  header,
  info,
}: {
  header: string
  info: string
}) => {
  return (
    <div className="text-center px-32 py-6">
      <h1 className="font-bold text-3xl text-left ">{header}</h1>
      <p className="text-foreground/50 mt-1">{info}</p>
    </div>
  )
}

export default DataNotFoundInformation
