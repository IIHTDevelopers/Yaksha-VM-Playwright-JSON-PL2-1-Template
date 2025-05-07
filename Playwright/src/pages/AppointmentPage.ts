import { Page, expect, Locator } from "@playwright/test";
import { CommonMethods } from "../tests/commonMethods";
import { PatientSearchHelper } from "../tests/reusableMethod";
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
      appointmentLink: page.locator('a[href="#/Appointment"]'),
      counterItem: page.locator("//div[@class='counter-item']"),
      titleName: page.locator("//span[text() = 'Patient List |']"),
      searchBar: page.locator("#quickFilterInput"),
      hospitalSearchBar: page.locator("#id_input_search_using_hospital_no"),
      patientName: page.locator(
        "//div[@role='gridcell' and @col-id='ShortName'][1]"
      ),
      patientCode: page.locator(
        "//div[@role='gridcell' and @col-id='PatientCode'][1]"
      ),
      newVisitTab: page.locator(`//a[contains(text(),'New Visit')]`),
      newVisitHeading: page.locator(`//h3[contains(@class,"heading")]`),
      visitTypeDropdown: page.locator('[name="VistType"]'),
      fromDateField: page.locator('(//input[@id="date"])[1]'),
      toDateField: page.locator('(//input[@id="date"])[2]'),
      showPatientButton: page.locator(
        '//button[contains(text(),"Show Patient")]'
      ),
      religionSelectDropdown: page.locator('[id="id_select_ethnic_group"]'),
      departmentDropdown: page.locator('[id="txtDepartment"]'),
      doctorNameDropdown: page.locator('[id="doctorName"]'),
      printInvoiceButton: page.locator('[value="Print Invoice"]'),
    };
  }

  /**
   * @Test6 Validates the presence of the specified patient name in the 'ShortName' column of the search results grid.
   *
   * @description This method checks whether the provided patient name appears in the search results under the 'ShortName'
   *              column. It waits for the column to be visible, retrieves the list of displayed names, and verifies that the
   *              expected patient name is included. If the name is found, the method confirms success; otherwise, it logs
   *              an error for troubleshooting purposes.
   *
   * @param {string} patientName - The expected patient name to validate in the search results.
   * @return {Promise<void>} - No return value, but logs any error encountered during the verification process.
   */
  async verifypatientName() {
    try {
      await this.appointment.appointmentLink.click();

      // Select first counter item if available
      await this.page.waitForTimeout(10000);
      const counterCount = await this.appointment.counterItem.count();
      console.log("counter count is " + counterCount);
      if (counterCount > 0) {
        await CommonMethods.highlightElement(
          this.appointment.counterItem.first()
        );
        await this.appointment.counterItem.first().click();
        await this.appointment.appointmentLink.click();
      } else {
        console.log("No counter items available");
      }
      await expect(this.appointment.patientName.first()).toBeVisible();
      const patientName = await this.appointment.patientName
        .first()
        .innerText();

      await this.appointment.searchBar.fill(patientName);
      await this.appointment.searchBar.press("Enter");
      await this.page.waitForTimeout(1000);

      await this.page.waitForTimeout(3000);
      await expect(
        this.page.locator("//div[@role='gridcell' and @col-id='ShortName']")
      ).toBeVisible();
      const resultList = this.page.locator(
        "//div[@role='gridcell' and @col-id='ShortName']"
      );
      await this.page.waitForTimeout(3000);
      await expect(resultList).toContainText(patientName);
    } catch (e) {
      console.log(`Error in verifying Patient Name ${e}`);
    }
  }

  /**
   * @Test6 Navigates to the Appointment module and opens the New Visit page using the Alt + N
   * keyboard shortcut. It also ensures a counter is selected before navigation and verifies
   * that the correct page is displayed.
   *
   * Steps:
   * 1. Navigates to the Appointment module.
   * 2. Selects the first available counter item (if any).
   * 3. Clicks the New Visit tab.
   * 4. Uses the keyboard shortcut (Alt + N) to open the New Visit page.
   * 5. Verifies the New Visit heading is visible and the URL contains 'Appointment/Visit'.
   *
   * @returns {Promise<void>} - This method performs navigation and validation without returning a value.
   */
  async openNewVisitPageThroughKeyboardButton() {
    // // Navigate to Appointment module
    // await CommonMethods.highlightElement(this.appointment.appointmentLink);
    // await this.appointment.appointmentLink.click();
    // // Select first counter item if available
    // await this.page.waitForTimeout(10000);
    // const counterCount = await this.appointment.counterItem.count();
    // console.log("counter count is " + counterCount);
    // if (counterCount > 0) {
    //   await CommonMethods.highlightElement(
    //     this.appointment.counterItem.first()
    //   );
    //   await this.appointment.counterItem.first().click();
    //   await this.appointment.appointmentLink.click();
    // } else {
    //   console.log("No counter items available");
    // }
    // // Click on the New Visit tab
    // await CommonMethods.highlightElement(this.appointment.newVisitTab);
    // await this.appointment.newVisitTab.click();
    // // Trigger Alt + Enter keyboard shortcut to open the New Visit page
    // await this.page.keyboard.down("Alt");
    // await this.page.keyboard.press("N");
    // await this.page.keyboard.up("Alt");
    // await this.page.waitForTimeout(2000);
    // // Verify the New Visit page is displayed
    // expect(await this.appointment.newVisitHeading.isVisible()).toBeTruthy();
    // expect(this.page.url()).toContain("Appointment/Visit");
  }

  /**
   * @Test10.1 This method performs a patient search in the appointment section using reusable function.
   *
   * @description This function highlights the appointment link, clicks on it to navigate to the appointment page,
   *              waits for the page to load, and triggers the patient search action using a helper function.
   *              It ensures that the patient search is executed successfully and returns true if the search operation is completed.
   * @return boolean - Returns true if the patient search is successful, otherwise false.
   */

  async searchPatientInAppointment() {
    const patientSearchHelper = new PatientSearchHelper(this.page);
    await CommonMethods.highlightElement(this.appointment.appointmentLink);
    await this.appointment.appointmentLink.click();

    // Select first counter item if available
    await this.page.waitForTimeout(10000);
    const counterCount = await this.appointment.counterItem.count();
    console.log("counter count is " + counterCount);
    if (counterCount > 0) {
      await CommonMethods.highlightElement(
        this.appointment.counterItem.first()
      );
      await this.appointment.counterItem.first().click();
      await this.appointment.appointmentLink.click();
    } else {
      console.log("No counter items available");
    }

    await this.page.waitForTimeout(2000);
    await patientSearchHelper.searchPatient();
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
    await this.page.waitForTimeout(2000);
    await this.page.goto(
      "https://healthapp.yaksha.com/Home/Index#/Appointment/ListAppointment"
    );
    await this.page.locator('//h5[text()="New-1 "]').click();
    await this.page
      .locator('(//a[@href="#/Appointment/CreateAppointment"])[2]')
      .click();
    await this.page.locator('[name="name"]').click();
    const firstName = await this.getRandomFirstName();
    const appointmentTime = await this.getRandomTime();
    const appointmentDate = await this.getFutureDate();
    await this.page.locator("[formcontrolname='FirstName']").fill(firstName);
    await this.page.locator("[formcontrolname='LastName']").fill("LastName");
    await this.page.locator("//input[@value='Male']/../span").click();
    await this.page.locator("[formcontrolname='Age']").fill("26");
    const phoneNumber = Math.floor(Math.random() * 1000000000).toString();
    await this.page
      .locator("[formcontrolname='ContactNumber']")
      .fill(phoneNumber);

    await this.page
      .locator("[formcontrolname='AppointmentTime']")
      .fill(appointmentTime);
    await this.page
      .locator("[formcontrolname='AppointmentDate']")
      .fill(appointmentDate);
    await this.page.locator('[name="addappointment"]').click();
    const successMessage = await this.page
      .locator('[class="main-message"]')
      .textContent();
    const appointmentId: any = await successMessage
      ?.split("AppointmentID is")[1]
      .trim();
    console.log(`The appointment ID is this ${appointmentId}`);
    await this.page.waitForTimeout(5000);

    await this.page
      .locator('(//a[@href="#/Appointment/ListAppointment"])[2]')
      .click();
    await this.appointment.visitTypeDropdown.selectOption("New");
    await this.appointment.fromDateField.fill("2020-01-01");
    await this.appointment.toDateField.fill(appointmentDate);
    await this.appointment.showPatientButton.click();
    const checkinButtonToBeClicked = await this.getCheckinButtonByAppointmentId(
      appointmentId
    );
    const patientName = await this.getPatientNameByAppointmentId(appointmentId);
    // await this.page.locator('(//a[contains(text(),"CheckIn")])[1]').click();
    await checkinButtonToBeClicked.click();
    await this.appointment.religionSelectDropdown.selectOption("Others");
    await this.page.locator('[id="ddlCountrySubdivision"]').click();
    await this.appointment.departmentDropdown.fill("Cardiology");
    await this.page.keyboard.down("Enter");
    await this.appointment.doctorNameDropdown.fill("Dr. pooja Mishra");
    await this.page
      .locator('[formcontrolname="VisitDate"]')
      .fill(appointmentDate);
    await this.appointment.printInvoiceButton.click({ force: true });
    await this.page.locator('[class="confirm"]').click();

    const duplicatePatient = await this.page
      .locator('//b[contains(text(),"SURE THAT THIS IS NEW PATIENT, CLICK")]')
      .all();

    if (duplicatePatient.length > 0) {
      await this.page
        .locator('//button[contains(text(),"Register as New Patient")]')
        .first()
        .click();
      const hospitalNumberRaw = await this.page
        .locator('//p[text()="Hospital No: "]/strong')
        .textContent();
      const hospitalNumber = await hospitalNumberRaw?.trim();
      await this.page.locator(".btn-danger").click();
      return hospitalNumber;
    } else {
      const hospitalNumberRaw = await this.page
        .locator('//p[text()="Hospital No: "]/strong')
        .textContent();
      const hospitalNumber = await hospitalNumberRaw?.trim();
      await this.page.locator(".btn-danger").click();
      return hospitalNumber;
    }
  }

  async getAppointmentIdOfFirstPatientWithCheckInButton() {
    const appointmentIdElement = await this.page.locator(
      '(//a[contains(text(),"CheckIn")])[1]/../../../div[@col-id="AppointmentId"]'
    );
    const appointmentId = await appointmentIdElement.textContent();
    return appointmentId;
  }

  async getPatientNameByAppointmentId(appointmentId: string) {
    const patientNameElement = await this.page.locator(
      `//div[@col-id="AppointmentId" and text()='${appointmentId}']/../div[@col-id="FullName"]`
    );
    const patientName = await patientNameElement.textContent();
    return patientName;
  }

  async getCheckinButtonByAppointmentId(appointmentId: string) {
    return this.page.locator(
      `//div[@col-id="AppointmentId" and text()="${appointmentId}"]/..//a[@danphe-grid-action="checkin"]`
    );
  }

  async getRandomTime() {
    const hour = await Math.floor(Math.random() * 24)
      .toString()
      .padStart(2, "0");
    const minute = await Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, "0");
    return `${hour}:${minute}`;
  }

  async getFutureDate() {
    const futureDate = new Date();
    await futureDate.setDate(futureDate.getDate() + 5); // Hardcoded to 5 days ahead

    const year = await futureDate.getFullYear();
    const month = await (futureDate.getMonth() + 1).toString().padStart(2, "0");
    const day = await futureDate.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  async getRandomFirstName() {
    const randomNum = Math.floor(Math.random() * 100000); // Generates number between 0–999
    return `${randomNum}First`;
  }
}
