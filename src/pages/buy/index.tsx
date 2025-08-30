import logo from "../../assets/teste-logo.jpg";

export function Buy() {
  return (
    <main className="w-full mt">
      <div className="w-full flex flex-col max-w-6xl gap-2 mt-30 px-4 mx-auto">
        <h1 className="w-full flex items-center justify-center mb-4 text-2xl font-bold">
          Compra do dia: 21/05/2025
        </h1>
        <div className="grid p-5 gap-6 grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
          <section className="flex flex-col bg-white rounded p-2">
            <strong className="w-full text-center">titulo do produto</strong>

            <div className="flex items-center justify-center-safe gap-10 ">
              <div className="flex flex-col items-center gap-1">
                <img src={logo} alt="logo do produto" className="h-20 w-25" />
                <strong>R$ 50,00</strong>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  <strong>Qantidade: </strong>
                  <p>2</p>
                </div>
                <div className="flex gap-2">
                  <strong>Valor total:</strong>
                  <p>R$100,00</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
