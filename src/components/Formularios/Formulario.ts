import {
  IFormularioDadosElementoInput,
  IFormularioDadosInputs,
  IFormularioElementoInput,
} from './IFormulario'

export class Formulario {
  public static obterDadosInputs() {
    let dadosInputs: IFormularioDadosInputs = {}

    let inputsFormularios = document.getElementsByClassName('data-form-orc')
    let arrayInputsFormularios = Array.from(inputsFormularios)

    arrayInputsFormularios.forEach((input: unknown): void => {
      let i = input as IFormularioDadosElementoInput
      let objeto = {
        [i.name]: [i.value],
      }
      dadosInputs = { ...dadosInputs, ...objeto }
    })

    return dadosInputs
  }

  public static gerarHtmlInput(elemento: IFormularioElementoInput): string {
    let required = elemento.required ? 'required' : ''
    let tipo = elemento.tipo ? elemento.tipo : 'text'
    let tag = elemento.tag ? elemento.tag : 'input'
    let codigoInput = ''

    let labelInput = `
            <label
              for="form_${elemento.nome}"
              class="form-label">
                ${elemento.legenda} ${required ? '*' : ''}
            </label>`

    if (tag == 'input') {
      codigoInput = `
            <input
              type="${tipo}"
              id="form_${elemento.nome}"
              name="${elemento.nome}"
              class="form-control data-form-orc"
              placeholder="${elemento.placeholder}"
              ${required}
          />`
    }
    if (tag == 'textarea') {
      codigoInput = `
          <textarea
            class="form-control data-form-orc"
            id="form_${elemento.nome}"
            name="${elemento.nome}"
            rows="${elemento.rows}"
            ${required}
          ></textarea>
        `
    }
    if (tag == 'select') {
      const selectInicio = `
          <select
            id="form_${elemento.nome}"
            name="${elemento.nome}"
            class="form-select data-form-orc"
          >
        `
      const selectFim = `
          </select>
        `
      let optionsLista = ''
      elemento.options?.forEach(dados => {
        optionsLista += `<option value="${dados.value}" ${
          dados.selected ? 'selected' : ''
        }>${dados.value}</option>`
      })
      codigoInput = selectInicio + optionsLista + selectFim
    }

    return labelInput + codigoInput
  }
}
