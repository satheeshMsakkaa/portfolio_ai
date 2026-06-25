
export default function Loading(){
  return <>
        <div className="mt-4 flex items-center gap-2">

          <div
            className="
            animate-spin
            rounded-full
            h-5
            w-5
            border-b-2
            border-blue-600
            "
          />

          <span>
            Please wait...
          </span>

        </div>
  </>
}
