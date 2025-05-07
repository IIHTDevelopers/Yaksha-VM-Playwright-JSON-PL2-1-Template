export default class AppointmentPage {

  readonly page: Page;
  public appointment: {
    appointmentLink: Locator;
    counterItem: Locator;
    titleName: Locator;
    searchBar: Locator;
    patientName: Locator;
    hospitalSearchBar: Locator;
    patientCode: Locator;
    newVisitTab: Locator;
    newVisitHeading: Locator;
    visitTypeDropdown: Locator;
    fromDateField: Locator;
    toDateField: Locator;
    showPatientButton: Locator;
    religionSelectDropdown: Locator;
    departmentDropdown: Locator;
    doctorNameDropdown: Locator;
    printInvoiceButton: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.appointment = {
      appointmentLink: page.locator(''),
      counterItem: page.locator(""),
      titleName: page.locator(""),
      searchBar: page.locator(""),
      hospitalSearchBar: page.locator(""),
      patientName: page.locator(""),
      patientCode: page.locator(""),
      newVisitTab: page.locator(``),
      newVisitHeading: page.locator(``),
      visitTypeDropdown: page.locator(''),
      fromDateField: page.locator(''),
      toDateField: page.locator(''),
      showPatientButton: page.locator(''),
      religionSelectDropdown: page.locator(''),
      departmentDropdown: page.locator(''),
      doctorNameDropdown: page.locator(''),
      printInvoiceButton: page.locator(''),
    };
  }

  /**
   * @Test8 Verifies that the appointment status changes appropriately after printing the invoice.
   *
   * @returns {Promise<[string, string]>} Returns an array with hospital number and phone number.
   *
   * Steps:
   * 1. Navigate to Appointment List and create a new appointment with random patient details.
   * 2. Capture the generated appointment ID from the success message.
   * 3. Navigate back to Appointment List and filter appointments by date and type.
   * 4. Check-in the patient and fill required details.
   * 5. Print the invoice and confirm the dialog.
   * 6. Capture and return the hospital number and phone number for verification.
   */
  async verifyAppointmentStatusChangeAfterInvoicePrint() {
  }
}
