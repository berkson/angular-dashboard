import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';
declare var google: any; // recupera uma variável javascript global de biblioteca externa

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private dados: any;

  constructor(private dadosService: DadosService) {}

  ngOnInit(): void {
    this.dadosService.obterDados().subscribe((dados) => {
      this.dados = dados;
      this.init();
    });
  }
  init(): void {
    if (typeof google !== undefined) {
      google.charts.load('current', { packages: ['corechart'] });
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * Chama os métodos geradores de gráficos.
   */
  exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
    this.exibirDonutChart();
  }
  exibirColumnChart() {
    const el = document.getElementById('column_chart');
    const chart = new google.visualization.ColumnChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibirLineChart() {
    const el = document.getElementById('line_chart');
    const chart = new google.visualization.LineChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }
  exibirBarChart() {
    const el = document.getElementById('bar_chart');
    const chart = new google.visualization.BarChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes());
  }

  exibir3dPieChart(): void {
    const el = document.getElementById('3d_pie_chart');
    const chart = new google.visualization.PieChart(el);
    let options = this.obterOpcoes();
    options['is3D'] = true;

    chart.draw(this.obterDataTable(), options);
  }

  exibirDonutChart(): void {
    const el = document.getElementById('donut_chart');
    const chart = new google.visualization.PieChart(el);
    let options = this.obterOpcoes();
    options['pieHole'] = 0.4;

    chart.draw(this.obterDataTable(), options);
  }

  /**
   * Opções do gráfico
   * @returns any
   */
  obterOpcoes(): any {
    return {
      title: 'Quantidade de cadastros primeiro semestre',
      width: 400,
      height: 300,
    };
  }

  /**
   * Cria e retorna o objeto datatable da api de gráficos
   * @return any
   */
  obterDataTable(): any {
    const data = new google.visualization.DataTable();

    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quatidade');
    data.addRows(this.dados);

    return data;
  }
}
