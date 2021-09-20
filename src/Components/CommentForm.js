import React, { Component } from "react";

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Label,
  Row,
  Col,
} from "reactstrap";

import { Control, LocalForm, Errors } from "react-redux-form";

//// validators
const required = (value) => value && value.length; //value > 0
const maxLength = (len) => (value) => !value || value.length <= len;
const minLength = (len) => (value) => value && value.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      CommentIsFormModalOpen: false,
    };

    this.toggleCommentFormModal = this.toggleCommentFormModal.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
  }

  handleCommentSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  toggleCommentFormModal() {
    this.setState({
      CommentIsFormModalOpen: !this.state.CommentIsFormModalOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleCommentFormModal}>
          <span className="fa fa-comments"></span> Submit Comment
        </Button>

        <Modal
          isOpen={this.state.CommentIsFormModalOpen}
          toggle={this.toggleCommentFormModal}
        >
          <ModalHeader toggle={this.toggleCommentFormModal}>
            {" "}
            Submit Comment{" "}
          </ModalHeader>
          <ModalBody>
            <LocalForm
              onSubmit={(values) => this.handleCommentSubmit(values)}
            >
   
              <Row className="form-group">
                <Label htmlFor="rating" md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                    id="rating"
                    validators={{
                      required,
                    }}
                  >
                    <option>Please Select level</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              {/* author */}
              <Row className="form-group">
                <Label htmlFor="author" md={12}>
                  {" "}
                  Your Name{" "}
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>

              {/* comment */}
              <Row className="form-group">
                <Label htmlFor="comment" md={12}>
                  Your Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                    validators={{
                      required,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                    }}
                  />
                </Col>
              </Row>

              {/* submit button */}
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CommentForm;
