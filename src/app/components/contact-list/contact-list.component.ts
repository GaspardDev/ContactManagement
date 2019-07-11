import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Contact} from '../../models/contact';
import {Router} from '@angular/router';
import {ContactService} from '../../services/contact.service';
import { MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private contactService: ContactService,
              private router: Router) {

  }
  public contact: Contact;
  public array: any;
  public dataSource: any;
  public dataSourcePro: any;
  public dataSourceNonPro: any;
  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  displayedColumns: string[] = ['id', 'lastName', 'firstName', 'address', 'birthDate', 'isProfessionnal', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  navigationSubscription;

  ngOnInit() {
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    this.getArrayAll();
    this.getArrayPro();
    this.getArrayNonPro();
  }
/* Méthodes permettant la pagination du tableau et le remplissage du tableau avec tous les contacts*/
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
    this.iteratorPro();
    this.iteratorNonPro();
  }
  private getArrayAll() {
    this.contactService.getContactsList()
      .subscribe((contacts) => {
        this.dataSource = new MatTableDataSource<Contact>(contacts);
        this.array = contacts;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }
  private iterator() {
    this.dataSource = this.sort;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
  }
  /* Méthodes permettant la pagination du tableau et le remplissage du tableau avec les contacts professionnels*/
  private getArrayPro() {
    this.contactService.getContactsProfessionnel()
      .subscribe((contacts) => {
      this.dataSourcePro = new MatTableDataSource<Contact>(contacts).sort;
      this.array = contacts;
      this.totalSize = this.array.length;
      this.iteratorPro();
    });
  }
  private iteratorPro() {
    this.dataSourcePro = this.sort;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSourcePro = part;
  }

  /* Méthodes permettant la pagination du tableau et le remplissage du tableau avec les contacts non-professionnels*/
  private getArrayNonPro() {
    this.contactService.getContactsNonProfessionnel()  .subscribe((contacts) => {
      this.dataSourceNonPro = new MatTableDataSource<Contact>(contacts);
      this.array = contacts;
      this.totalSize = this.array.length;
      this.iteratorNonPro();
    });
  }
  private iteratorNonPro() {
    this.dataSourceNonPro = this.sort;
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSourceNonPro = part;
  }

  /*Méthode de modification d'un contact */
updateContact(id: number) {
  this.router.navigate(['contacts/' + id]);
}

  /*Méthode de suppresion d'un contact */
  deleteContact(id: number) {
    this.contactService.deleteContact(id).subscribe(data => data);
    alert('Contact supprimé!');
    this.router.navigate(['contacts/']);
    this.ngAfterViewInit();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
