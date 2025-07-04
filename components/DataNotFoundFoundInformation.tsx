const DataNotFoundInformation = ({
  header,
  info,
}: {
  header: string
  info: string
}) => {
  return (
    <div className="flex flex-col  py-6 ">
      <div className="mx-auto max-w-[336px]">
        <h1 className="font-bold text-4xl text-left  ">{header}</h1>
        <p className="text-foreground/50 mt-1 text-left  ">{info}</p>
      </div>
    </div>
  )
}

export default DataNotFoundInformation
